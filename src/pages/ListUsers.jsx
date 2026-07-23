import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import UserCard from '../components/UserCard/UserCard'
import { getAllusers } from '../firebase';
import { AuthContext } from '../AuthContext';
import Loader from '../components/Loader/Loader';
import AppHelmet from '../components/AppHelmet';

export default function ListUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);

  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const ADMIN_EMAILS = ['kkibetkkoir@gmail.com', 'arovanzgamez@gmail.com'];

  useEffect(() => {
    if (currentUser !== null) {
      if (ADMIN_EMAILS.includes(currentUser.email)) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
        window.history.back()
      }
    }
  }, [currentUser])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  const [isOnline] = useState(() => {
    return navigator.onLine
  })

  useEffect(() => {
    if (isAdmin) {
      getAllusers(setUsers, setLoading);
    }
  }, [isOnline, isAdmin]);

  useEffect(() => {
    loading && setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(u =>
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      );
    }

    if (planFilter !== 'all') {
      result = result.filter(u => {
        const plan = u.isPremium ? (u.subscription || 'Premium') : 'Free';
        return plan.toLowerCase() === planFilter.toLowerCase();
      });
    }

    switch (sortBy) {
      case 'username-asc':
        result.sort((a, b) => (a.username || '').localeCompare(b.username || ''));
        break;
      case 'username-desc':
        result.sort((a, b) => (b.username || '').localeCompare(a.username || ''));
        break;
      case 'date-newest':
        result.sort((a, b) => new Date(b.subDate || 0) - new Date(a.subDate || 0));
        break;
      case 'date-oldest':
        result.sort((a, b) => new Date(a.subDate || 0) - new Date(b.subDate || 0));
        break;
      default:
        break;
    }

    return result;
  }, [users, search, planFilter, sortBy]);

  return (
    <div className='list-users'>
      <AppHelmet title={"All Users"} location={'/users'} />
      {loading && <Loader />}

      {!loading && isAdmin && (
        <>
          <div className="users-controls">
            <input
              type="search"
              className="users-search"
              placeholder="Search by username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} className="users-select">
              <option value="all">All plans</option>
              <option value="free">Free</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="users-select">
              <option value="default">Sort: Default</option>
              <option value="username-asc">Username A → Z</option>
              <option value="username-desc">Username Z → A</option>
              <option value="date-newest">Newest subscription</option>
              <option value="date-oldest">Oldest subscription</option>
            </select>
            <span className="users-count">{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => <UserCard key={user.email} user={user} />)
          ) : (
            <p className="no-results">No users match your search.</p>
          )}
        </>
      )}
    </div>
  )
}
