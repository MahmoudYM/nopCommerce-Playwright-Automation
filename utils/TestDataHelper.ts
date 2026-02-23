export class TestDataHelper {
  /**
   * Generate unique email address for testing
   */
  static generateEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}.${timestamp}.${random}@test.com`;
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate test user data
   */
  static generateUserData() {
    return {
      gender: Math.random() > 0.5 ? 'male' as const : 'female' as const,
      firstName: this.generateRandomString(6),
      lastName: this.generateRandomString(8),
      email: this.generateEmail(),
      password: 'Test@123456',
      company: 'Test Company Inc.'
    };
  }

  /**
   * Wait for specified milliseconds
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
