## API Scopes

- `read:games` - Read games data
- `create:games` - Create new games
- `read:players` - Read player data
- `create:players` - Create player data

## Testing Authentication

### 1. Test Public Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Public root endpoint
curl http://localhost:3000/
```

### 2. Test Protected Endpoints

First, log in through the web app at http://localhost:5173, then check the Network tab in browser dev tools to see the Authorization header being sent.

You can also test with curl using a token:

```bash
# Get your token from the browser's localStorage or Network tab
TOKEN="your-jwt-token-here"

# Test protected endpoint
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/profile

# Test endpoint with specific scope
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/games
```

## API Endpoints

### Public Endpoints

- `GET /` - API status
- `GET /health` - Health check

### Protected Endpoints

- `GET /api/profile` - User profile (requires authentication)
- `GET /api/games` - Get games (requires `read:games` scope)
- `POST /api/games` - Create game (requires `create:games` scope)
- `GET /api/players` - Get players (requires authentication)
