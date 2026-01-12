import type {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import { createRun, addResults } from '../utils/testrail-client';

export default class TestRailReporter implements Reporter {
  private runId!: number;
  private results: any[] = [];

  async onBegin() {
    const runName = `Playwright Run - ${new Date().toISOString()}`;
    this.runId = await createRun();
    console.log(`✅ TestRail run created: ${this.runId}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const match = test.title.match(/C(\d+)/);
    if (!match) return;

    const caseId = Number(match[1]);

    const statusId = this.mapStatus(result.status);

    this.results.push({
      case_id: caseId,
      status_id: statusId,
      comment: `Status: ${result.status}\nDuration: ${result.duration}ms`,
    });
  }

  async onEnd(result: FullResult) {
    if (this.results.length === 0) {
      console.warn('⚠️ No TestRail results to publish');
      return;
    }

    await addResults(this.runId, this.results);
    console.log(`📤 Results pushed to TestRail run ${this.runId}`);
  }

  private mapStatus(status: string): number {
    switch (status) {
      case 'passed':
        return 1;
      case 'failed':
        return 5;
      case 'skipped':
        return 2;
      case 'timedOut':
        return 5;
      default:
        return 3;
    }
  }
}
