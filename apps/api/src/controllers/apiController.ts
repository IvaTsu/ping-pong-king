import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Ping Pong King API",
  });
};

export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: "User profile retrieved successfully",
    user: {
      id: req.user?.sub,
      email: req.user?.email,
      name: req.user?.name,
      picture: req.user?.picture,
      scopes: req.user?.scope?.split(" ") || [],
    },
  });
};

export const getGames = (req: AuthenticatedRequest, res: Response) => {
  // Mock games data - replace with your actual database query
  const mockGames = [
    {
      id: "1",
      player1: "John Doe",
      player2: "Jane Smith",
      score1: 21,
      score2: 19,
      date: "2025-08-07",
      winner: "John Doe",
    },
    {
      id: "2",
      player1: "Alice Johnson",
      player2: "Bob Wilson",
      score1: 18,
      score2: 21,
      date: "2025-08-06",
      winner: "Bob Wilson",
    },
  ];

  res.json({
    message: "Games retrieved successfully",
    userId: req.user?.sub,
    games: mockGames,
    total: mockGames.length,
  });
};

export const createGame = (req: AuthenticatedRequest, res: Response) => {
  const gameData = req.body;

  // Mock game creation - replace with your actual database insertion
  const newGame = {
    id: Math.random().toString(36).substr(2, 9),
    ...gameData,
    createdBy: req.user?.sub,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    message: "Game created successfully",
    game: newGame,
  });
};

export const getPlayers = (req: AuthenticatedRequest, res: Response) => {
  // Mock players data - replace with your actual database query
  const mockPlayers = [
    {
      id: "player-001",
      name: "John Smith",
      email: "john.smith@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 1850,
      registeredWhen: "2023-01-15T10:30:00Z",
      gamesPlayed: 45,
      gamesWon: 32,
      winRate: 71.11,
    },
    {
      id: "player-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 1720,
      registeredWhen: "2023-02-10T14:20:00Z",
      gamesPlayed: 38,
      gamesWon: 24,
      winRate: 63.16,
    },
    {
      id: "player-003",
      name: "Mike Chen",
      email: "mike.chen@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 1680,
      registeredWhen: "2023-01-28T09:45:00Z",
      gamesPlayed: 52,
      gamesWon: 28,
      winRate: 53.85,
    },
    {
      id: "player-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 1650,
      registeredWhen: "2023-03-05T16:15:00Z",
      gamesPlayed: 29,
      gamesWon: 15,
      winRate: 51.72,
    },
    {
      id: "player-005",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 1590,
      registeredWhen: "2023-02-20T11:30:00Z",
      gamesPlayed: 41,
      gamesWon: 19,
      winRate: 46.34,
    },
    {
      id: "player-006",
      name: "Lisa Wilson",
      email: "lisa.wilson@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
      rating: 1540,
      registeredWhen: "2023-03-12T13:45:00Z",
      gamesPlayed: 33,
      gamesWon: 14,
      winRate: 42.42,
    },
    {
      id: "player-007",
      name: "David Brown",
      email: "david.brown@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
      rating: 1520,
      registeredWhen: "2023-01-08T08:20:00Z",
      gamesPlayed: 47,
      gamesWon: 18,
      winRate: 38.3,
    },
    {
      id: "player-008",
      name: "Jessica Martinez",
      email: "jessica.martinez@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
      rating: 1480,
      registeredWhen: "2023-02-28T15:10:00Z",
      gamesPlayed: 25,
      gamesWon: 9,
      winRate: 36.0,
    },
    {
      id: "player-009",
      name: "Ryan Taylor",
      email: "ryan.taylor@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
      rating: 1450,
      registeredWhen: "2023-03-18T12:25:00Z",
      gamesPlayed: 36,
      gamesWon: 12,
      winRate: 33.33,
    },
    {
      id: "player-010",
      name: "Amanda White",
      email: "amanda.white@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
      rating: 1420,
      registeredWhen: "2023-01-22T17:40:00Z",
      gamesPlayed: 31,
      gamesWon: 10,
      winRate: 32.26,
    },
  ];

  res.json({
    userId: req.user?.sub,
    content: mockPlayers,
    pageable: {
      totalElements: mockPlayers.length,
      totalPages: 1,
      size: mockPlayers.length,
      number: 0,
    },
  });
};
