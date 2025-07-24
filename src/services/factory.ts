/**
 * Service factory for dependency injection
 */

import { GitService } from './git.js';
import { StateService } from './state.js';
import { PetService } from './pet.js';

export interface Services {
  git: GitService;
  state: StateService;
  pet: PetService;
}

/**
 * Create instances of all services
 */
export function createServices(): Services {
  return {
    git: new GitService(),
    state: new StateService(),
    pet: new PetService(),
  };
}