import { format, parseISO } from "date-fns";

export const formatISOString = (str: string, targetFormat: string): string => format(parseISO(str), targetFormat);