import * as Types from '../types/types';

export abstract class Utilities {
  public abstract deleteTrigger(uuid: string): void;
  
  public abstract fetch(path: string, options?: any): Promise<any>;

  /**
   * Returns a base url for the BTT webserver endpoint
   */
  public getUrl(config: Partial<Types.IBTTConfig>): string {
    const { protocol, domain, port } = config; 

    return `${protocol}://${domain}:${port}/`;
  }

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public async makeAction(
    action: string, 
    data: Record<string, any>,
    config: Types.IBTTConfig,
  ): Promise<any> {
    const parameters = this.params(data, config.sharedKey);
    const url = this.getUrl(config);
    const urlToFetch = this.buildFullUrl(action, parameters, url);
    
    try {
      const result = await this.fetch(urlToFetch);
      return result;
    } catch (err) {
      return new Error(
        `
        Fetch to BetterTouchTool webserver API failed. See the details:
        
        Action: ${action}
        Parameters: ${JSON.stringify(data, null, 2)}
        Url: ${url}
        
        Error message: ${err}`,
      );
    }
  }
}