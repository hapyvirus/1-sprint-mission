import * as s from "superstruct";
import { CursorParamsStruct } from "./commonStruct";

export const CreateCommentBodyStuct = s.object({
  content: s.nonempty(s.string(), 1000),
});

export const GetCommentList = CursorParamsStruct;

export const UpdateCommentBodyStuct = s.partial(CreateCommentBodyStuct);
