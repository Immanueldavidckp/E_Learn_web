CC=arm-none-eabi-gcc
CFLAGS=-mcpu=cortex-m4 -mthumb -O2
LDFLAGS=-T linker.ld
SOURCES=main.c startup.s
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=output.elf

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) -o $@ $^

clean:
	rm -f $(OBJECTS) $(EXECUTABLE)
