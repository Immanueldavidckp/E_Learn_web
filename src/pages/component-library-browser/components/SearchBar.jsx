import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, onClearSearch }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    onClearSearch();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search components by name, function, or specifications..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-20"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          )}
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-smooth"
          >
            <Icon 
              name="SlidersHorizontal" 
              size={16} 
              className={`transition-smooth ${isAdvancedOpen ? 'text-primary' : 'text-muted-foreground'}`}
            />
          </button>
        </div>
      </div>

      {/* Advanced Search Options */}
      {isAdvancedOpen && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Voltage Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min V"
                  className="text-sm"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max V"
                  className="text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Interface Type
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Any Interface</option>
                <option value="i2c">I2C</option>
                <option value="spi">SPI</option>
                <option value="uart">UART</option>
                <option value="analog">Analog</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Manufacturer
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Any Manufacturer</option>
                <option value="arduino">Arduino</option>
                <option value="adafruit">Adafruit</option>
                <option value="sparkfun">SparkFun</option>
                <option value="texas-instruments">Texas Instruments</option>
                <option value="microchip">Microchip</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;