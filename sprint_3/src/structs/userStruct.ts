import * as s from "superstruct";

export const CreateUserBodyStuct = s.object({
  email: s.string(),
  nickname: s.coerce(
    s.nonempty(s.string()),
    s.size(s.string(), 1, 10),
    (value) => value.trim()
  ),
  password: s.coerce(
    s.nonempty(s.string()),
    s.size(s.string(), 6, 10),
    (value) => value.trim()
  ),
  image: s.string(),
});

export const UpdateUSerBodyStuct = s.partial(CreateUserBodyStuct);
