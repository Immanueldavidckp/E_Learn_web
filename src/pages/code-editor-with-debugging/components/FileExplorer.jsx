import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FileExplorer = ({ onFileSelect, selectedFile }) => {
  const [expandedFolders, setExpandedFolders] = useState(['src', 'examples']);
  const [projectStructure, setProjectStructure] = useState([  ]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectArch, setNewProjectArch] = useState('arm-m4');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getFileIcon = (file) => {
    if (file.type === 'folder') return 'Folder';
    switch (file.language) {
      case 'c': return 'FileCode';
      case 'makefile': return 'Settings';
      case 'markdown': return 'FileText';
      default: return 'File';
    }
  };

  const renderFileTree = (items, depth = 0) => {
    return items.map(item => (
      <div key={item.id}>
        <div
          className={`flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-muted transition-smooth ${
            selectedFile === item.id ? 'bg-primary/10 text-primary' : 'text-foreground'
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id);
            } else {
              onFileSelect(item);
            }
          }}
        >
          <Icon 
            name={item.type === 'folder' && expandedFolders.includes(item.id) ? 'FolderOpen' : getFileIcon(item)} 
            size={16} 
            className="mr-2 text-muted-foreground"
          />
          <span className="flex-1 font-medium">{item.name}</span>
          {item.type === 'file' && (
            <span className="text-xs text-muted-foreground">{item.size}</span>
          )}
          {item.type === 'folder' && (
            <Icon 
              name={expandedFolders.includes(item.id) ? 'ChevronDown' : 'ChevronRight'} 
              size={14} 
              className="text-muted-foreground"
            />
          )}
        </div>
        {item.type === 'folder' && expandedFolders.includes(item.id) && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const openCreateProjectModal = () => {
    setShowCreateProjectModal(true);
    setNewProjectName('');
    setNewProjectArch('arm-m4');
    setErrorMessage('');
  };

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
    setErrorMessage('');
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      setErrorMessage('Project name is required');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName: newProjectName.trim(), architecture: newProjectArch })
      });
      const data = await response.json();
      if (data.success) {
        // Update project structure to show new project folder and remove default files
        setProjectStructure([
          {
            id: newProjectName.trim(),
            name: newProjectName.trim(),
            type: 'folder',
            children: [] // Could fetch actual files if needed
          }
        ]);
        closeCreateProjectModal();
      } else {
        setErrorMessage(data.error || 'Failed to create project');
      }
    } catch (error) {
      setErrorMessage('Network error: ' + error.message);
    }
  };
  <div className="flex items-center justify-between p-3 border-b border-border">
    <h3 className="font-medium text-foreground">Explorer</h3>
  </div>

  {/* Blue Create New Project Button */}
  <div className="px-3 py-2">
    <button
      onClick={openCreateProjectModal}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-smooth"
    >
      + Create New Project
    </button>
  </div>


  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-medium text-foreground">Explorer</h3>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="New File"
          >
            <Icon name="FilePlus" size={16} className="text-muted-foreground" />
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="New Folder"
          >
            <Icon name="FolderPlus" size={16} className="text-muted-foreground" />
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="Refresh"
          >
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-smooth"
            title="Create New Project"
            onClick={openCreateProjectModal}
          >
            <Icon name="PlusSquare" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Project Name */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Folder" size={16} className="text-primary" />
          <span className="font-medium text-foreground">EmbedSim Project</span>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {renderFileTree(projectStructure)}
      </div>

      {/* Project Stats */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Files:</span>
            <span>{projectStructure.reduce((acc, item) => {
              if (item.type === 'folder' && item.children) {
                return acc + item.children.length;
              }
              return acc + 1;
            }, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span>--</span>
          </div>
          <div className="flex justify-between">
            <span>Modified:</span>
            <span>Just now</span>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Select Architecture</label>
              <select
                value={newProjectArch}
                onChange={(e) => setNewProjectArch(e.target.value)}
                className="w-full border border-border rounded px-3 py-2"
              >
                <option value="arm-m4">ARM M4</option>
                <option value="aarch64">AARCH64</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Project Name</label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full border border-border rounded px-3 py-2"
                placeholder="Enter project name"
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeCreateProjectModal}
                className="px-4 py-2 rounded bg-muted hover:bg-muted/80 transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
