export interface RequirementValidationResult {
  valid: boolean;
  reason?: string;
}


export function validateRequirement(
  requirement: string
): RequirementValidationResult {

  // ------------------------------------------
  // Check 1: Empty requirement
  // ------------------------------------------

  if (!requirement || !requirement.trim()) {

    return {
      valid: false,
      reason: 'Requirement is empty'
    };
  }


  // ------------------------------------------
  // Check 2: Remove whitespace
  // ------------------------------------------

  const cleanedRequirement =
    requirement.trim();


  // ------------------------------------------
  // Check 3: Requirement too short
  // ------------------------------------------

  if (cleanedRequirement.length < 20) {

    return {
      valid: false,
      reason:
        'Requirement is too short to generate meaningful test cases'
    };
  }


  // ------------------------------------------
  // Check 4: Meaningful content
  // ------------------------------------------

  const words =
    cleanedRequirement
      .split(/\s+/)
      .filter(Boolean);


  if (words.length < 5) {

    return {
      valid: false,
      reason:
        'Requirement does not contain enough information'
    };
  }


  // ------------------------------------------
  // Requirement is valid
  // ------------------------------------------

  return {
    valid: true
  };
}