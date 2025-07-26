import { UserDTO } from '../dtos/UserDTO.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUsers = (req, res) => {
    try {
      const result = this.userService.createUsers(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  updateUsers = (req, res) => {
    try {
      const result = this.userService.updateUsers(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  deleteUsers = (req, res) => {
    try {
      this.userService.deleteUsers(req.body);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  searchUsers = (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing ?q= query" });
    res.json(this.userService.searchUsers(query));
  };

  listUsers = (_req, res) => {
    res.json(this.userService.listUsers());
  };
}
