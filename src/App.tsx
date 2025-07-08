import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  Edit3, 
  Upload, 
  UserPlus,
  Eye,
  Bell,
  Play,
  Pause,
  CheckCircle,
  TrendingDown,
  Building2,
  Download,
  ChevronDown,
  ChevronRight,
  Settings,
  UserCheck
} from 'lucide-react';

interface Auction {
  id: string;
  title: string;
  description: string;
  openingPrice: number;
  bidDecrement: number;
  duration: number;
  startDate: string;
  startTime: string;
  status: 'upcoming' | 'active' | 'paused' | 'closed';
  participants: number;
  currentBid?: number;
}

interface CompanyGroup {
  companyName: string;
  procurementName: string;
  auctions: Auction[];
  isExpanded: boolean;
}

const mockCompanyGroups: CompanyGroup[] = [
  {
    companyName: 'LogisticsNow',
    procurementName: 'prod test new 2',
    isExpanded: true,
    auctions: [
      {
        id: '555384',
        title: 'GANDHAR->JNPT->20FT Container Transport',
        description: 'Container transport from Gandhar to JNPT port, 20FT container',
        openingPrice: 140977,
        bidDecrement: 500,
        duration: 10,
        startDate: '23-06-2025',
        startTime: '16:10:32',
        status: 'upcoming',
        participants: 8,
      },
      {
        id: '250028',
        title: 'GANDHAR->JNPT->40FT Container Transport',
        description: 'Container transport from Gandhar to JNPT port, 40FT container',
        openingPrice: 160012,
        bidDecrement: 100,
        duration: 10,
        startDate: '23-06-2025',
        startTime: '16:10:54',
        status: 'active',
        participants: 12,
        currentBid: 158500,
      }
    ]
  },
  {
    companyName: 'TheLogisticsNow',
    procurementName: '10lanes bulk upload test ID:5626',
    isExpanded: false,
    auctions: [
      {
        id: '445821',
        title: 'Bulk Cargo Delhi to Chennai',
        description: 'Bulk cargo transportation from Delhi to Chennai',
        openingPrice: 250000,
        bidDecrement: 1000,
        duration: 15,
        startDate: '22-06-2025',
        startTime: '14:30:00',
        status: 'closed',
        participants: 15,
        currentBid: 242000,
      },
      {
        id: '445822',
        title: 'Express Delivery Mumbai to Pune',
        description: 'Express delivery service for urgent cargo',
        openingPrice: 85000,
        bidDecrement: 250,
        duration: 8,
        startDate: '24-06-2025',
        startTime: '10:15:00',
        status: 'upcoming',
        participants: 6,
      }
    ]
  },
  {
    companyName: 'THELOGISTICSNOW',
    procurementName: 'LoRRI Spot Auction: 30/1/2025 ID:6607',
    isExpanded: false,
    auctions: [
      {
        id: '667890',
        title: 'Spot Auction - Emergency Transport',
        description: 'Emergency transport service for time-critical cargo',
        openingPrice: 95000,
        bidDecrement: 500,
        duration: 5,
        startDate: '30-01-2025',
        startTime: '09:00:00',
        status: 'paused',
        participants: 4,
        currentBid: 92000,
      }
    ]
  }
  ,
  {
    companyName: 'GlobalLogistics',
    procurementName: 'International Freight Services ID:7890',
    isExpanded: false,
    auctions: [
      {
        id: '778901',
        title: 'International Freight - Mumbai to Dubai',
        description: 'International freight service for export cargo',
        openingPrice: 320000,
        bidDecrement: 2000,
        duration: 20,
        startDate: '25-06-2025',
        startTime: '11:00:00',
        status: 'upcoming',
        participants: 18,
      },
      {
        id: '778902',
        title: 'Air Cargo - Delhi to Singapore',
        description: 'Express air cargo service for time-sensitive goods',
        openingPrice: 450000,
        bidDecrement: 3000,
        duration: 12,
        startDate: '26-06-2025',
        startTime: '09:30:00',
        status: 'active',
        participants: 22,
        currentBid: 441000,
      }
    ]
  },
  {
    companyName: 'FastTrack Logistics',
    procurementName: 'Regional Distribution Network ID:8901',
    isExpanded: false,
    auctions: [
      {
        id: '889012',
        title: 'Last Mile Delivery - Bangalore Network',
        description: 'Last mile delivery services across Bangalore metropolitan area',
        openingPrice: 180000,
        bidDecrement: 800,
        duration: 18,
        startDate: '27-06-2025',
        startTime: '13:45:00',
        status: 'upcoming',
        participants: 14,
      },
      {
        id: '889013',
        title: 'Cold Chain Transport - Hyderabad to Chennai',
        description: 'Temperature-controlled transport for pharmaceutical goods',
        openingPrice: 275000,
        bidDecrement: 1500,
        duration: 25,
        startDate: '28-06-2025',
        startTime: '08:15:00',
        status: 'closed',
        participants: 11,
        currentBid: 268000,
      }
    ]
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'paused' | 'closed'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [companyGroups, setCompanyGroups] = useState(mockCompanyGroups);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const toggleAccordion = (companyName: string) => {
    setCompanyGroups(groups => 
      groups.map(group => 
        group.companyName === companyName 
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  const toggleCompanySelection = (companyName: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyName)
        ? prev.filter(name => name !== companyName)
        : [...prev, companyName]
    );
  };

  const filteredGroups = companyGroups.map(group => ({
    ...group,
    auctions: group.auctions.filter(auction => {
      const matchesTab = activeTab === 'upcoming' ? auction.status === 'upcoming' : 
                       activeTab === 'active' ? auction.status === 'active' :
                       activeTab === 'paused' ? auction.status === 'paused' :
                       auction.status === 'closed';
      
      const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           group.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           auction.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesSearch;
    })
  })).filter(group => group.auctions.length > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTotalTabCount = (status: string) => {
    return companyGroups.reduce((total, group) => 
      total + group.auctions.filter(auction => auction.status === status).length, 0
    );
  };

  const getTotalParticipants = (auctions: Auction[]) => {
    return auctions.reduce((total, auction) => total + auction.participants, 0);
  };

  const getCompanyStatusCounts = (auctions: Auction[]) => {
    const counts = { upcoming: 0, active: 0, paused: 0, closed: 0 };
    auctions.forEach(auction => {
      counts[auction.status]++;
    });
    return counts;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LoRRI</h1>
                  <p className="text-sm text-gray-500">Logistics Reverse Auctions</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Remaining Credits:</span>
                <span className="font-semibold text-blue-600">184</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">S</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Smeet</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Auction Management</h2>
            <p className="text-gray-600 mt-0.5 text-xs">Manage and monitor your logistics reverse auctions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Create Auction
            </button>
          </div>
        </div>

        {/* Bulk Actions for Selected Companies */}
        {selectedCompanies.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedCompanies.length} company group{selectedCompanies.length > 1 ? 's' : ''} selected
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors">
                  <Edit3 className="w-4 h-4 mr-1.5" />
                  Edit Auctions
                </button>
                <button className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors">
                  <UserCheck className="w-4 h-4 mr-1.5" />
                  Shortlist Transporters
                </button>
                <button className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors">
                  <UserPlus className="w-4 h-4 mr-1.5" />
                  Add User
                </button>
                <button className="inline-flex items-center px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors">
                  <Upload className="w-4 h-4 mr-1.5" />
                  Bulk Upload
                </button>
                <button 
                  onClick={() => setSelectedCompanies([])}
                  className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 mb-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search auctions, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-4">
              {[
                { key: 'upcoming', label: 'Upcoming', count: getTotalTabCount('upcoming') },
                { key: 'active', label: 'Active', count: getTotalTabCount('active') },
                { key: 'paused', label: 'Paused', count: getTotalTabCount('paused') },
                { key: 'closed', label: 'Closed', count: getTotalTabCount('closed') }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 py-1 px-2 rounded-full text-xs bg-gray-100 text-gray-600">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Company Accordion Groups */}
          <div className="p-4">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">No auctions found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredGroups.map((group) => {
                  const statusCounts = getCompanyStatusCounts(group.auctions);
                  const totalParticipants = getTotalParticipants(group.auctions);
                  
                  return (
                    <div key={group.companyName} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Company Header */}
                      <div className="bg-gray-50 border-b border-gray-200 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <input
                              type="checkbox"
                              checked={selectedCompanies.includes(group.companyName)}
                              onChange={() => toggleCompanySelection(group.companyName)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            
                            <button
                              onClick={() => toggleAccordion(group.companyName)}
                              className="flex items-center space-x-2 text-left hover:bg-gray-100 rounded-lg p-1 -m-1 transition-colors flex-1 min-w-0"
                            >
                              {group.isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              )}
                              
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Building2 className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-gray-900 text-sm">{group.companyName}</h3>
                                  <p className="text-xs text-gray-600 truncate">{group.procurementName}</p>
                                </div>
                              </div>
                            </button>
                          </div>
                          
                          {/* Action Buttons - Consistent width and spacing */}
                          <div className="hidden lg:flex items-center space-x-2 ml-4">
                            <button className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors w-24">
                              <Edit3 className="w-3 h-3 mr-1.5" />
                              <span className="hidden xl:inline">Edit</span>
                              <span className="xl:hidden">Edit</span>
                            </button>
                            <button className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors w-24">
                              <UserCheck className="w-3 h-3 mr-1.5" />
                              <span className="hidden xl:inline">Shortlist</span>
                              <span className="xl:hidden">List</span>
                            </button>
                            <button className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors w-24">
                              <UserPlus className="w-3 h-3 mr-1.5" />
                              <span className="hidden xl:inline">Add User</span>
                              <span className="xl:hidden">Add</span>
                            </button>
                            <button className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors w-24">
                              <Upload className="w-3 h-3 mr-1.5" />
                              <span className="hidden xl:inline">Upload</span>
                              <span className="xl:hidden">Upload</span>
                            </button>
                          </div>
                          
                          {/* Mobile Action Menu */}
                          <div className="lg:hidden">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="hidden lg:flex items-center space-x-4 ml-4">
                            {/* Participants Count - More Prominent */}
                            <div className="flex items-center space-x-2 bg-white rounded-lg px-2 py-1 border border-gray-200">
                              <Users className="w-4 h-4 text-blue-600" />
                              <div className="text-center">
                                <div className="text-xs font-bold text-blue-600">{totalParticipants}</div>
                                <div className="text-xs text-gray-500">Participants</div>
                              </div>
                            </div>
                            
                            {/* Status Counts */}
                            <div className="flex items-center space-x-2">
                              {/* Removed repetitive status counts as requested */}
                            </div>
                            
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Mobile Summary */}
                          <div className="lg:hidden flex items-center space-x-2 ml-2">
                            <div className="flex items-center space-x-1 bg-white rounded-lg px-2 py-1 border border-gray-200">
                              <Users className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-bold text-blue-600">{totalParticipants}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Mobile Action Buttons */}
                        <div className="lg:hidden mt-3 flex flex-wrap gap-2">
                          <button className="inline-flex items-center px-2 py-1 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors">
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button className="inline-flex items-center px-2 py-1 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Shortlist
                          </button>
                          <button className="inline-flex items-center px-2 py-1 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors">
                            <UserPlus className="w-3 h-3 mr-1" />
                            Add User
                          </button>
                          <button className="inline-flex items-center px-2 py-1 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors">
                            <Upload className="w-3 h-3 mr-1" />
                            Upload
                          </button>
                        </div>
                      </div>

                      {/* Auction Cards */}
                      {group.isExpanded && (
                        <div className="p-2 space-y-2">
                          {group.auctions.map((auction) => (
                            <div key={auction.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-sm font-semibold text-gray-900">{auction.title}</h4>
                                    <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                                      <Calendar className="w-4 h-4" />
                                      <span className="text-xs">{auction.startDate} at {auction.startTime}</span>
                                    </div>
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(auction.status)}`}>
                                      {getStatusIcon(auction.status)}
                                      <span className="ml-1 capitalize">{auction.status}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Mobile Date/Time */}
                                  <div className="sm:hidden flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs">{auction.startDate} at {auction.startTime}</span>
                                  </div>
                                  
                                  <p className="text-gray-600 mb-2 text-xs">{auction.description}</p>
                                  
                                  {/* Publish Checkbox and Action Buttons - Grouped Together */}
                                  <div className="flex items-center space-x-3 mb-3">
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`publish-${auction.id}`}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        defaultChecked={auction.status !== 'upcoming'}
                                      />
                                      <label htmlFor={`publish-${auction.id}`} className="text-xs font-medium text-gray-700">
                                        Publish
                                      </label>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      {auction.status === 'upcoming' && (
                                        <button className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors">
                                          <Play className="w-3 h-3 mr-1" />
                                          Start Auction
                                        </button>
                                      )}
                                      {auction.status === 'active' && (
                                        <>
                                          <button className="inline-flex items-center px-3 py-1 bg-yellow-600 text-white rounded text-xs font-medium hover:bg-yellow-700 transition-colors">
                                            <Pause className="w-3 h-3 mr-1" />
                                            Pause
                                          </button>
                                          <button className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Close Auction
                                          </button>
                                        </>
                                      )}
                                      {auction.status === 'paused' && (
                                        <>
                                          <button className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors">
                                            <Play className="w-3 h-3 mr-1" />
                                            Resume
                                          </button>
                                          <button className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Close Auction
                                          </button>
                                        </>
                                      )}
                                     </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                    <div className="bg-gray-50 rounded-lg p-1.5">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-xs font-medium text-gray-500 uppercase">Opening Price</span>
                                      </div>
                                      <p className="text-sm font-bold text-gray-900">₹{auction.openingPrice.toLocaleString()}</p>
                                    </div>
                                    
                                    {auction.currentBid && (
                                      <div className="bg-green-50 rounded-lg p-1.5">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <TrendingDown className="w-4 h-4 text-green-600" />
                                          <span className="text-xs font-medium text-green-600 uppercase">Current Bid</span>
                                        </div>
                                        <p className="text-sm font-bold text-green-700">₹{auction.currentBid.toLocaleString()}</p>
                                      </div>
                                    )}
                                    
                                    <div className="bg-gray-50 rounded-lg p-1.5">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <TrendingDown className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-500 uppercase">Bid Decrement</span>
                                      </div>
                                      <p className="text-sm font-bold text-gray-900">₹{auction.bidDecrement}</p>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-lg p-1.5">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-500 uppercase">Duration</span>
                                      </div>
                                      <p className="text-sm font-bold text-gray-900">{auction.duration} min</p>
                                    </div>
                                    
                                    {/* Individual Auction Participants - Prominent */}
                                    <div className="bg-blue-50 rounded-lg p-1.5">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        <span className="text-xs font-medium text-blue-600 uppercase">Participants</span>
                                      </div>
                                      <p className="text-sm font-bold text-blue-700">{auction.participants}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-1 ml-3">
                                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;