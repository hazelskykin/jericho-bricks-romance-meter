
import { useCallback } from 'react';

/**
 * Hook to process dialogue text and highlight special glossary terms
 */
export const useGlossary = () => {
  /**
   * Process text to identify and format glossary terms
   */
  const processGlossaryTerms = useCallback((text: string): string => {
    // This is a simple implementation - in the future, this could be extended
    // to find and highlight actual glossary terms from a database
    
    // For now, just return the original text
    return text;
  }, []);

  return {
    processGlossaryTerms
  };
};

export default useGlossary;
