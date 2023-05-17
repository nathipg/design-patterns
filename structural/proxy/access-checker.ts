import { User } from './user';

class AccessChecker {
  private static instance: AccessChecker;

  private constructor() {}

  public static getInstance(): AccessChecker {
    if(!AccessChecker.instance) {
      AccessChecker.instance = new AccessChecker();
    }

    return AccessChecker.instance;
  }

  public shouldAccess(user: User, resource: string) {
    const firstResourceLetter = resource.toLocaleLowerCase().charCodeAt(0) - 97;
    const userId = user.getId();

    const isUserIdEven = userId % 2 === 0;
    const isFirstResourceLetterEven = firstResourceLetter % 2 === 0;

    // Can access if both are even or if both are odd
    return isUserIdEven === isFirstResourceLetterEven;
  }
}


const accessChecker = AccessChecker.getInstance();

export { accessChecker };
