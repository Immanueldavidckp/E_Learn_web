
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const pty = require('node-pty');
const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const compilers = {
  'arm-none-eabi-gcc': {
    command: (sourceFile, outputDir) =>
      `arm-none-eabi-gcc -o ${path.join(outputDir, 'output.elf')} ${sourceFile} -map ${path.join(outputDir, 'output.map')}`,
    outputFiles: ['output.elf', 'output.map']
  },
  'aarch64-gcc': {
    command: (sourceFile, outputDir) =>
      `aarch64-linux-gnu-gcc -o ${path.join(outputDir, 'output.img')} ${sourceFile} -T ${path.join(outputDir, 'linker.ld')} -nostdlib -static`,
    outputFiles: ['output.img', 'linker.ld']
  }
};

function parseErrors(stderr) {
  // Basic error parsing, can be improved for better explanations
  const lines = stderr.split('\\n');
  const errors = lines.filter(line => line.toLowerCase().includes('error'));
  return errors.join('\\n');
}

app.post('/compile', upload.single('source'), (req, res) => {
  const compiler = req.body.compiler;
  if (!compilers[compiler]) {
    return res.status(400).json({ error: 'Unsupported compiler' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No source file uploaded' });
  }

  const sourceCode = req.file.buffer.toString('utf-8');
  const tempDir = fs.mkdtempSync(path.join(__dirname, 'tmp-'));
  const sourceFile = path.join(tempDir, 'source.c');

  fs.writeFileSync(sourceFile, sourceCode);

  const compileCommand = compilers[compiler].command(sourceFile, tempDir);

  exec(compileCommand, (error, stdout, stderr) => {
    const errorOutput = error ? parseErrors(stderr) : null;
    const outputFiles = {};

    compilers[compiler].outputFiles.forEach(file => {
      const filePath = path.join(tempDir, file);
      if (fs.existsSync(filePath)) {
        outputFiles[file] = fs.readFileSync(filePath, 'base64');
      }
    });

    // Clean up source file but keep tempDir for debugging if needed
    fs.unlinkSync(sourceFile);

    res.json({
      success: !error,
      stdout,
      stderr: errorOutput,
      outputFiles
    });
  });
});

// New endpoint to run shell commands (e.g. make)
app.post('/run-command', express.json(), (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  // Run the command in the projects directory or temp directory
  const execOptions = { cwd: path.join(__dirname, 'projects', 'new') };

  exec(command, execOptions, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ output: stderr || error.message });
    }
    res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 4000;

// Helper function to create project files based on architecture
function createProjectFiles(projectPath, architecture) {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  if (architecture === 'arm-m4') {
    // Create ARM M4 project files
    fs.writeFileSync(path.join(projectPath, 'Makefile'), `CC=arm-none-eabi-gcc
CFLAGS=-mcpu=cortex-m4 -mthumb -O2
LDFLAGS=-T linker.ld
SOURCES=main.c startup.s
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=output.elf

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
\t$(CC) $(LDFLAGS) -o $@ $^

clean:
\trm -f $(OBJECTS) $(EXECUTABLE)
`);

    fs.writeFileSync(path.join(projectPath, 'linker.ld'), `/* Linker script for ARM M4 */
SECTIONS
{
  .text : { *(.text*) }
  .data : { *(.data*) }
  .bss : { *(.bss*) }
}
`);

    fs.writeFileSync(path.join(projectPath, 'startup.s'), `.syntax unified
.cpu cortex-m4
.thumb

.global _start
_start:
  /* Startup code here */
  b .
`);

    fs.writeFileSync(path.join(projectPath, 'main.c'), `#include <stdint.h>

int main(void) {
  while (1) {
    // Main loop
  }
  return 0;
}
`);

    fs.writeFileSync(path.join(projectPath, 'linker.ld'), `/* Linker script for ARM M4 */
SECTIONS
{
  .text : { *(.text*) }
  .data : { *(.data*) }
  .bss : { *(.bss*) }
}
`);

    fs.writeFileSync(path.join(projectPath, 'startup.s'), `.syntax unified
.cpu cortex-m4
.thumb

.global _start
_start:
  /* Startup code here */
  b .
`);

    fs.writeFileSync(path.join(projectPath, 'main.c'), `#include <stdint.h>

int main(void) {
  while (1) {
    // Main loop
  }
  return 0;
}
`);
  } else if (architecture === 'aarch64') {
    // Create AARCH64 project files
    fs.writeFileSync(path.join(projectPath, 'Makefile'), `CC=aarch64-linux-gnu-gcc
CFLAGS=-O2
LDFLAGS=-static -nostdlib -T linker.ld
SOURCES=main.c
EXECUTABLE=output.img

all: $(EXECUTABLE)

$(EXECUTABLE): $(SOURCES)
\t$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^

clean:
\trm -f $(EXECUTABLE)
`);

    fs.writeFileSync(path.join(projectPath, 'linker.ld'), `/* Linker script for AARCH64 */
SECTIONS
{
  .text : { *(.text*) }
  .data : { *(.data*) }
  .bss : { *(.bss*) }
}
`);

    fs.writeFileSync(path.join(projectPath, 'main.c'), `int main() {
  while (1) {
    // Main loop
  }
  return 0;
}
`);
  }
}

app.post('/create-project', (req, res) => {
  const { projectName, architecture } = req.body;

  if (!projectName || !architecture) {
    return res.status(400).json({ error: 'Missing projectName or architecture' });
  }

  const validArchitectures = ['arm-m4', 'aarch64'];
  if (!validArchitectures.includes(architecture)) {
    return res.status(400).json({ error: 'Invalid architecture' });
  }

  const projectsDir = path.join(__dirname, 'projects');
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir);
  }

  const projectPath = path.join(projectsDir, projectName);

  if (fs.existsSync(projectPath)) {
    return res.status(400).json({ error: 'Project already exists' });
  }

  try {
    createProjectFiles(projectPath, architecture);
    res.json({ success: true, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

wss.on('connection', async (ws, req) => {
  // Parse token from query params
  const urlParams = new URLSearchParams(req.url.replace('/?', ''));
  const token = urlParams.get('token');

  console.log('Received token:', token);

  if (!token) {
    ws.close(1008, 'Authentication token missing');
    return;
  }

  // Verify token with Supabase
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  console.log('Supabase getUser result:', { user, error });

  if (error || !user) {
    ws.close(1008, 'Invalid authentication token');
    return;
  }

  // Determine working directory based on user id
  const baseProjectsDir = path.join(__dirname, 'projects');
  let cwd = path.join(baseProjectsDir, user.id);

  console.log(`Spawning bash shell for user: ${user.id} in directory: ${cwd}`);

  // Ensure directory exists
  if (!fs.existsSync(cwd)) {
    fs.mkdirSync(cwd, { recursive: true });
  }

  const shell = pty.spawn('C:\\Program Files\\Git\\bin\\bash.exe', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: cwd,
    env: process.env
  });

  shell.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (message) => {
    console.log('Received message from client:', message);
    // Append newline if not present to simulate Enter key behavior
    if (!message.toString().endsWith('\n')) {
      shell.write(message.toString() + '\n');
    } else {
      shell.write(message.toString());
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    shell.kill();
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
    shell.kill();
  });
});

server.listen(PORT, () => {
  console.log("Compiler service running on port " + PORT);
});
