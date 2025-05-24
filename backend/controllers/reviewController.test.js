import reviewController from '../controllers/reviewController.js';
import geminiService from '../services/geminiService.js';

// Mock the geminiService
jest.mock('../services/geminiService.js');

describe('reviewController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    // Reset mocks for each test
    jest.clearAllMocks();

    mockReq = {
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(), // Allows chaining .status().json()
      json: jest.fn(),
    };
  });

  describe('handleReview', () => {
    it('should return a 200 status and review data on successful code review', async () => {
      const sampleCode = "function test() { return 'ok'; }";
      const mockReviewData = {
        issues: [],
        suggestions: [],
        score: "100/100 (Mock)",
        summary: "Mock summary: Looks good!",
        llm_output_markdown: "All clear."
      };

      mockReq.body.code = sampleCode;
      geminiService.analyzeCode.mockResolvedValueOnce(mockReviewData);

      await reviewController.handleReview(mockReq, mockRes);

      expect(geminiService.analyzeCode).toHaveBeenCalledTimes(1);
      expect(geminiService.analyzeCode).toHaveBeenCalledWith(sampleCode);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockReviewData);
    });

    it('should return a 400 status if no code is provided', async () => {
      mockReq.body.code = undefined; // or simply mockReq.body = {};

      await reviewController.handleReview(mockReq, mockRes);

      expect(geminiService.analyzeCode).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No code provided or code is empty.' });
    });

    it('should return a 400 status if code is an empty string', async () => {
      mockReq.body.code = '   '; // Empty or whitespace only

      await reviewController.handleReview(mockReq, mockRes);

      expect(geminiService.analyzeCode).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No code provided or code is empty.' });
    });
    
    it('should return a 400 status if code is not a string', async () => {
      mockReq.body.code = 12345; // Not a string

      await reviewController.handleReview(mockReq, mockRes);

      expect(geminiService.analyzeCode).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No code provided or code is empty.' });
    });

    it('should return a 500 status if geminiService throws an error', async () => {
      const sampleCode = "function test() { return 'ok'; }";
      const errorMessage = 'Service internal error';
      
      mockReq.body.code = sampleCode;
      geminiService.analyzeCode.mockRejectedValueOnce(new Error(errorMessage));

      await reviewController.handleReview(mockReq, mockRes);

      expect(geminiService.analyzeCode).toHaveBeenCalledTimes(1);
      expect(geminiService.analyzeCode).toHaveBeenCalledWith(sampleCode);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'An unexpected error occurred during the review process.' });
    });

    it('should log a console error when geminiService fails', async () => {
        const sampleCode = "function errorTest() {}";
        const error = new Error("Service failure");
        mockReq.body.code = sampleCode;
        geminiService.analyzeCode.mockRejectedValueOnce(error);
        
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error output during test

        await reviewController.handleReview(mockReq, mockRes);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error in reviewController.handleReview:', error);
        
        consoleErrorSpy.mockRestore(); // Clean up spy
    });
  });
});
