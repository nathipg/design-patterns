import { accessChecker } from './access-checker';
import { log } from './log';
import { User, users } from './user';

interface IBrowser {
  access(user: User, resource: string): string;
}

class RealBrowser implements IBrowser {  
  access(user: User, resource: string): string {
    return `${resource} content - [${user.getId()}] ${user.getName()}`;
  }
}

class ProxyBrowser implements IBrowser {
  private realBrowser: IBrowser;

  constructor() {
    this.realBrowser = new RealBrowser();
  }

  access(user: User, resource: string): string {
    // Verify permission
    const shouldAccess = accessChecker.shouldAccess(user, resource);

    if(!shouldAccess) {
      return 'Not allowed';
    }

    // Access
    const content = this.realBrowser.access(user, resource);

    // Log access
    const now = (new Date()).toString();
    log.register({
      user,
      content,
      resource,
      dateTime: now,
    });

    return content;
  }
}

const app = (browser: IBrowser) => {
  const [user1, user2] = users;

  console.log('=== First user access ===');
  console.log(browser.access(user1, 'apple-bees.com'));
  console.log(browser.access(user1, 'barbecue.com'));

  console.log('=== Second user access ===');
  console.log(browser.access(user2, 'apple-bees.com'));
  console.log(browser.access(user2, 'barbecue.com'));

  console.log('=== Log ===');
  console.log(log.list());
};

// With real browser
console.log('====== Real Browser ======');
app(new RealBrowser());

console.log('');

// With proxy
console.log('====== Proxy Browser ======');
app(new ProxyBrowser());
