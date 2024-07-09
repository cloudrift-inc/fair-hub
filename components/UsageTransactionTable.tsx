import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface UsageTransaction {
  created_at: string;
  amount: number;
  info: {
    Usage: {
      resource_id: string;
      usage_metadata: string;
    };
  };
}

interface UsageTransactionTableProps {
  transactions: UsageTransaction[];
}

const formatAmount = (amountInCents: number) => (amountInCents / 100).toFixed(2);

const parseDuration = (duration: string) => {
  const match = duration.match(/(\d+\.\d+)s/);
  return match ? parseFloat(match[1]) : 0;
};

const UsageTransactionTable: React.FC<UsageTransactionTableProps> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'created_at' | 'amount' | 'duration'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (field: 'created_at' | 'amount' | 'duration') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filterTransactions = (transactions: UsageTransaction[]) => {
    const now = new Date();
    let filteredTransactions = transactions;

    if (filter === 'day') {
      filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.created_at);
        return (
          transactionDate.getDate() === now.getDate() &&
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      });
    } else if (filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.created_at);
        return transactionDate >= oneWeekAgo;
      });
    } else if (filter === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.created_at);
        return transactionDate >= oneMonthAgo;
      });
    }

    if (searchTerm) {
      filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.created_at.includes(searchTerm) ||
        formatAmount(transaction.amount).includes(searchTerm) ||
        transaction.info.Usage.usage_metadata.includes(searchTerm)
      );
    }

    return filteredTransactions.sort((a, b) => {
      if (sortField === 'created_at') {
        return sortOrder === 'asc'
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortField === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else {
        const durationA = parseDuration(JSON.parse(a.info.Usage.usage_metadata).usage);
        const durationB = parseDuration(JSON.parse(b.info.Usage.usage_metadata).usage);
        return sortOrder === 'asc' ? durationA - durationB : durationB - durationA;
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Transactions</h2>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex items-center bg-[#292929] text-white py-2 px-4 rounded-lg">
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="bg-[#292929] text-white appearance-none pr-8"
            >
              <option value="all">All</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
            <ArrowDropDownIcon className="absolute right-2 pointer-events-none" />
          </div>
          <div className="relative flex items-center bg-[#292929] text-white py-2 px-4 rounded-lg">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-[#292929] text-white outline-none pr-8"
              placeholder="Search"
            />
            <SearchIcon className="absolute right-2" />
          </div>
        </div>
      </div>

      <div className="bg-[#232323] p-4 rounded-sm overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead>
            <tr>
              <th className="py-2 px-4">
                <div className="flex items-center">
                  Date and Time
                  <button onClick={() => handleSortChange('created_at')} className="ml-2">
                    <ArrowDropDownIcon 
                      className={`transition-transform duration-200 ${sortField === 'created_at' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="flex items-center">
                  Duration
                  <button onClick={() => handleSortChange('duration')} className="ml-2">
                    <ArrowDropDownIcon 
                      className={`transition-transform duration-200 ${sortField === 'duration' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </th>
              <th className="py-2 px-4">
                <div className="flex items-center">
                  Amount
                  <button onClick={() => handleSortChange('amount')} className="ml-2">
                    <ArrowDropDownIcon 
                      className={`transition-transform duration-200 ${sortField === 'amount' && sortOrder === 'desc' ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions(transactions).map((transaction, index) => (
              <tr
                key={transaction.info.Usage.resource_id}
                className={index % 2 === 0 ? 'bg-[#232323]' : 'bg-[#474747]'}
              >
                <td className="py-2 px-4 break-all" style={{ wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '300px' }}>{new Date(transaction.created_at).toLocaleString()}</td>
                <td className="py-2 px-4">{JSON.parse(transaction.info.Usage.usage_metadata).usage}</td>
                <td className="py-2 px-4">{formatAmount(transaction.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsageTransactionTable;
