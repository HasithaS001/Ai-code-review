import geminiService from './geminiService.js'; // Assuming ES Module syntax

describe('geminiService', () => {
  describe('analyzeCode', () => {
    const sampleCode = "function hello() { console.log('world'); }";

    it('should return a structured mock response after a delay', async () => {
      const startTime = Date.now();
      const result = await geminiService.analyzeCode(sampleCode);
      const endTime = Date.now();

      // Check for simulated delay (at least 1000ms, but allow for some overhead)
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
      // It could be slightly more due to other operations, so not checking for exact 1000ms.

      // Verify the structure and some content of the mock response
      expect(result).toBeDefined();
      expect(result).toHaveProperty('issues');
      expect(Array.isArray(result.issues)).toBe(true);
      expect(result).toHaveProperty('suggestions');
      expect(Array.isArray(result.suggestions)).toBe(true);
      expect(result).toHaveProperty('score');
      expect(typeof result.score).toBe('string');
      expect(result).toHaveProperty('summary_points');
      expect(Array.isArray(result.summary_points)).toBe(true);
      expect(result).toHaveProperty('llm_output_markdown');
      expect(typeof result.llm_output_markdown).toBe('string');

      // Check some specific mock data points to ensure it's the expected mock
      // These values come directly from the mockApiResponse in geminiService.js
      expect(result.score).toBe("65/100 (Mock)");
      expect(result.issues.some(issue => issue.id === "MOCK001" && issue.category === "Readability")).toBe(true);
      expect(result.suggestions.some(suggestion => suggestion.id === "SUG001")).toBe(true);
      expect(result.summary_points).toContain("Mock: Critical security vulnerability (SQL Injection) needs immediate attention.");
      expect(result.llm_output_markdown).toContain("## Mock Code Review:");

    }, 10000); // Increased timeout for this test due to the built-in 1s delay

    it('should log information about the call and prompt construction', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await geminiService.analyzeCode(sampleCode);

      expect(consoleSpy).toHaveBeenCalledWith(`geminiService.analyzeCode called with code (length: ${sampleCode.length})`);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Constructed prompt (first 100 chars):"));
      expect(consoleSpy).toHaveBeenCalledWith("Simulated API call finished.");

      consoleSpy.mockRestore();
    });

    // As `analyzeCode` currently doesn't throw errors for bad input (e.g., empty code string)
    // but rather proceeds to the mock API call, there's no specific error path to test here
    // other than what might happen if the Promise itself failed, which is not what we're testing.
    // If the service were to add input validation that throws errors, those tests would go here.
  });
});
