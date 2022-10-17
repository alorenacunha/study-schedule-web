export interface Module {
  id: string;
  name?: string;
  planId?: string;
  moduleId?: string;
  dead_line?: string;
  taskBeforeId?: string;
  type: string;
  timer: number;
  page_start: number;
  page_end: number;
  amount: number;
  timer_mean: number;
}
