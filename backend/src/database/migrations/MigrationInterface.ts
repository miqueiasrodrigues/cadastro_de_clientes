interface MigrationInterface {
    up(): Promise<void>;
    down(): Promise<void>;
  }
  
  export default MigrationInterface;
  