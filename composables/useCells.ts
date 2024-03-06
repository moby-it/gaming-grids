import * as v from 'valibot';

const Restrictions = v.array(v.array(v.string()));
const Input = v.object({
  restrictions: Restrictions,
  name: v.string()
});
export const useCells = (data: unknown) => {
  const { success, output } = v.safeParse(Input, data);
  if (!success) throw createError('failed to parse restrictions');
  const cells: Array<string | undefined> = new Array(16).fill(undefined);
  cells[0] = output.name;
  const rowRestrictions = output.restrictions[0];
  const columnRestrictions = output.restrictions[1];
  populateCells(rowRestrictions, columnRestrictions, cells);
  return { rowRestrictions, columnRestrictions, cells };
};

function populateCells(rowRestrictions: string[], columnRestrictions: string[], cells: Array<string | undefined>) {
  if (rowRestrictions) {
    rowRestrictions.forEach((rr, idx) => {
      cells[((idx + 1) * 4)] = rr;
    });
  }
  if (columnRestrictions) {
    columnRestrictions.forEach((rr, idx) => {
      cells[idx + 1] = rr;
    });
  }
}