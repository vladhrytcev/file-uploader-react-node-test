export default function removePropFromObject(obj, prop) {
  const { [prop]: _, ...rest } = obj;
  return { ...rest };
}
