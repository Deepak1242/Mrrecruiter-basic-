// Simple in-memory database for testing
let users = [];
let nextId = 1;

export const mockDB = {
  users: {
    findOne: async (query) => {
      if (query.email) {
        return users.find(user => user.email === query.email) || null;
      }
      if (query._id) {
        return users.find(user => user._id === query._id) || null;
      }
      return null;
    },
    
    create: async (userData) => {
      const newUser = {
        _id: nextId++,
        ...userData,
        toObject: function() {
          return { ...this };
        },
        comparePassword: async function(password) {
         
          return this.password === password;
        }
      };
      users.push(newUser);
      return newUser;
    },
    
    findById: async (id) => {
      return users.find(user => user._id == id) || null;
    },
    
    select: function(fields) {
      return this;
    }
  },
  
  getAllUsers: () => users,
  
 
  clearUsers: () => {
    users = [];
    nextId = 1;
  }
};
