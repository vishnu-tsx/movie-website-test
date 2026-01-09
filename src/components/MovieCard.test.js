import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

describe('MovieCard Component Tests', () => {
  const mockMovie = {
    Title: 'The Lion King',
    Year: '2019',
    Runtime: '118 min',
    Poster: 'https://example.com/poster.jpg',
  };

  it('should render movie card with movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const title = screen.getAllByText('The Lion King')[0];
    expect(title).toBeInTheDocument();
  });

  it('should render movie year', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const year = screen.getByText(/2019/);
    expect(year).toBeInTheDocument();
  });

  it('should render movie runtime', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const runtime = screen.getAllByText(/118 min/)[0];
    expect(runtime).toBeInTheDocument();
  });

  it('should render placeholder when runtime is missing', () => {
    const movieWithoutRuntime = { ...mockMovie, Runtime: undefined };
    render(<MovieCard movie={movieWithoutRuntime} />);
    
    expect(screen.getByText(/Runtime not available/)).toBeInTheDocument();
  });

  it('should render movie poster image', () => {
    render(<MovieCard movie={mockMovie} />);
    
    const image = screen.getByAltText('The Lion King');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });
});