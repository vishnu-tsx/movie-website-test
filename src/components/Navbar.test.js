import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component Tests', () => {
  
  it('should render navbar with custom site name', () => {
    render(<Navbar siteName="My Movies" />);
    
    const siteName = screen.getByText('My Movies');
    expect(siteName).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(<Navbar />);
    
    const searchInput = screen.getByPlaceholderText('Search movies...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should toggle mobile menu on burger click', () => {
    render(<Navbar />);
    
    const burgerMenu = screen.getByRole('button', { name: /toggle menu/i });
    const navLinks = screen.getByRole('list');
    
    // Initially, mobile menu should not have 'active' class
    expect(navLinks).not.toHaveClass('active');
    
    // Click burger menu
    fireEvent.click(burgerMenu);
    
    // Mobile menu should have 'active' class
    expect(navLinks).toHaveClass('active');
    
    // Click again to close
    fireEvent.click(burgerMenu);
    
    // Mobile menu should not have 'active' class
    expect(navLinks).not.toHaveClass('active');
  });
});