import axios from 'axios';

const client = axios.create({
  baseURL: 'https://chandrikak.testrail.io/index.php?/api/v2',
  auth: {
    username:'chandrikak@testvagrant.com',
    password: 'uW2Z7fi4bj8yxgoKfaPt-efxeaKh4/VtA9cChzFkz',
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function createRun() {
  const res = await client.post('/add_run/2', {
    name: `Playwright Run - ${new Date().toISOString()}`,
    include_all: true,
  });

  console.log('Run created:', res.data.id);
  return res.data.id;
}

export async function addResult(
  runId: number,
  caseId: number,
  statusId: number
) {
  await client.post(`/add_result_for_case/${runId}/${caseId}`, {
    status_id: statusId,
    comment: 'Executed via Playwright',
  });
}
export async function addResults(runId: number, results: any[]) {
  await client.post(`/add_results_for_cases/${runId}`, {
    results,
  });
}
