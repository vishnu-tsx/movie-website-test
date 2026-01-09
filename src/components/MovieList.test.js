import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList Component Tests', () => {
  const mockMovies = [
    {
      Title: 'The Lion King',
      Year: '2019',
      Runtime: '118 min',
      Poster: 'https://example.com/poster1.jpg',
    },
    {
      Title: 'John Wick',
      Year: '2014',
      Runtime: '101 min',
      Poster: 'https://example.com/poster2.jpg',
    },
  ];

  it('should render loading state', () => {
    render(<MovieList title="Test Movies" loading={true} />);
    
    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    render(<MovieList title="Test Movies" error="Failed to fetch" />);
    
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('should render empty state', () => {
    render(<MovieList title="Test Movies" movies={[]} />);
    
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });

  it('should render movie list with title', () => {
    render(<MovieList title="All Movies" movies={mockMovies} />);
    
    expect(screen.getByText('All Movies')).toBeInTheDocument();
  });

  it('should render all movies in the list', () => {
    render(<MovieList title="Test Movies" movies={mockMovies} />);
    
    expect(screen.getByText('The Lion King')).toBeInTheDocument();
    expect(screen.getByText('John Wick')).toBeInTheDocument();
  });
});