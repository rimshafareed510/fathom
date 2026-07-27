export function detectDocumentTitle(
  pastedText: string,
  userTitle?: string,
  fileName?: string,
  url?: string
): string {
  // 1. If user explicitly provided a custom title
  if (
    userTitle &&
    userTitle.trim() &&
    !userTitle.toLowerCase().includes('policy from web url') &&
    !userTitle.toLowerCase().includes('custom uploaded policy')
  ) {
    return userTitle.trim();
  }

  // 2. Try to extract main title/heading from text content
  if (pastedText && pastedText.trim()) {
    const lines = pastedText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    for (const line of lines.slice(0, 6)) {
      const cleanLine = line
        .replace(/^#+\s*/, '')
        .replace(/^title:\s*/i, '')
        .replace(/^document:\s*/i, '')
        .trim();

      // Check if line looks like a prominent document title (e.g., 5 to 90 chars)
      if (
        cleanLine.length >= 5 &&
        cleanLine.length <= 90 &&
        !cleanLine.toLowerCase().startsWith('paragraph ') &&
        !cleanLine.toLowerCase().startsWith('clause ') &&
        !cleanLine.toLowerCase().startsWith('section 1.1')
      ) {
        if (
          /policy|guidance|manual|handbook|regulations|standards|agreement|terms|aid|visa|lease|code|charter|framework|financial/i.test(
            cleanLine
          ) ||
          !cleanLine.includes('.')
        ) {
          return cleanLine.replace(/\.$/, '');
        }
      }
    }
  }

  // 3. Try to derive from URL
  if (url && url.trim()) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('mit') && (lowerUrl.includes('finaid') || lowerUrl.includes('financial'))) {
      return 'MIT Undergraduate Financial Aid Policy 2026';
    }
    if (lowerUrl.includes('uscis') || lowerUrl.includes('immigration')) {
      return 'USCIS Policy Manual';
    }
    if (lowerUrl.includes('uk') && (lowerUrl.includes('student') || lowerUrl.includes('visa'))) {
      return 'UK Student Visa Guidance';
    }
    if (lowerUrl.includes('bahria')) {
      return 'Bahria University Financial Aid Policy';
    }
    if (lowerUrl.includes('handbook')) {
      return 'Student Handbook 2026';
    }

    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      const pathname = parsedUrl.pathname.replace(/\/$/, '');
      const lastSegment = pathname.split('/').pop() || '';
      if (lastSegment && lastSegment.length > 3) {
        const titleFromPath = lastSegment
          .replace(/[-_]/g, ' ')
          .replace(/\.[^/.]+$/, '')
          .replace(/\b\w/g, (l) => l.toUpperCase());
        return titleFromPath;
      }
      return `${parsedUrl.hostname.replace(/^www\./, '')} Policy`;
    } catch {
      // Fallback
    }
  }

  // 4. Try to derive from Filename
  if (fileName && fileName.trim()) {
    const cleanFileName = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleanFileName) {
      return cleanFileName.replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  return 'MIT Undergraduate Financial Aid Policy 2026';
}
