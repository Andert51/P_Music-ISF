import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Albums } from './pages/Albums';
import { AlbumDetail } from './pages/AlbumDetail';
import { Library } from './pages/Library';
import { LikedSongs } from './pages/LikedSongs';
import { PlaylistDetail } from './pages/PlaylistDetail';
import { Search } from './pages/Search';
import { UploadSong } from './pages/UploadSong';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/liked" element={<LikedSongs />} />
        <Route path="/playlists/:id" element={<PlaylistDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<UploadSong />} />
      </Routes>
    </Layout>
  </Router>
);