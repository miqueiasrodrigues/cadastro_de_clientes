interface IService {
  execute: (...args: any[])  => Promise<any>;
}

export default IService;