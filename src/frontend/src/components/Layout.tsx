import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Player } from './Player';
import { NowPlayingPanel } from './NowPlayingPanel';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <TopNavbar />
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <Player />
    </div>
    <NowPlayingPanel />
  </div>
);