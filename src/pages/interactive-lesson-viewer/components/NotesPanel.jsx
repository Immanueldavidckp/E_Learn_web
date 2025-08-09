import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NotesPanel = ({ isOpen, onClose, lessonId }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: `Key concepts from this lesson:\n• Digital logic gates are fundamental building blocks\n• AND, OR, NOT gates form the basis of all digital circuits\n• Truth tables help visualize gate behavior`,
      timestamp: new Date(Date.now() - 3600000),
      section: "Digital Logic Fundamentals"
    },
    {
      id: 2,
      content: "Remember: NAND and NOR gates are universal gates - any logic function can be implemented using only these gates.",
      timestamp: new Date(Date.now() - 1800000),
      section: "Universal Gates"
    }
  ]);
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date(),
        section: "Current Section"
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 md:relative md:bg-transparent">
      <div className="absolute right-0 top-0 h-full w-full md:w-80 bg-surface border-l border-border shadow-elevated md:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Lesson Notes</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <Input
            type="search"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Add Note */}
        <div className="p-4 border-b border-border">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this lesson..."
            className="w-full h-20 p-3 border border-border rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            onClick={addNote}
            disabled={!newNote.trim()}
            className="mt-2 w-full"
          >
            Add Note
          </Button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center">
              <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {searchTerm ? 'Try a different search term' : 'Start taking notes to remember key concepts'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary">
                      {note.section}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-muted-foreground hover:text-destructive transition-smooth"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap mb-2">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(note.timestamp)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button className="text-muted-foreground hover:text-foreground transition-smooth">
                        <Icon name="Edit3" size={12} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-smooth">
                        <Icon name="Share2" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;