import { describe, it, expect } from 'vitest';
import { createServices } from '../../../src/services/factory.js';
import { GitService } from '../../../src/services/git.js';
import { StateService } from '../../../src/services/state.js';
import { PetService } from '../../../src/services/pet.js';

describe('Service Factory', () => {
  describe('createServices', () => {
    it('should create instances of all services', () => {
      const services = createServices();

      expect(services).toBeDefined();
      expect(services.git).toBeInstanceOf(GitService);
      expect(services.state).toBeInstanceOf(StateService);
      expect(services.pet).toBeInstanceOf(PetService);
    });

    it('should create new instances on each call', () => {
      const services1 = createServices();
      const services2 = createServices();

      expect(services1.git).not.toBe(services2.git);
      expect(services1.state).not.toBe(services2.state);
      expect(services1.pet).not.toBe(services2.pet);
    });

    it('should have all required properties', () => {
      const services = createServices();

      expect(services).toHaveProperty('git');
      expect(services).toHaveProperty('state');
      expect(services).toHaveProperty('pet');
    });
  });
});