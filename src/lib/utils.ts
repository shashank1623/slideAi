import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the name of the month corresponding to the given month number.
 *
 * @param month - The month number (1 for January, 2 for February, etc.).
 * @returns The name of the month as a string, or 'Invalid Month' if the month number is not between 1 and 12.
 */
export const getMonth = (month: number) => {

  const months: string [] =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] 

  if(month < 1 || month > 12){
    return 'Invalid Month'
  }
  return months[month - 1];
}

/**
 * Validates and updates an array by checking for duplicates.
 * 
 * If the element is not found in the array, it adds the element to the array.
 * If the element is found in the array, it removes the element from the array.
 * 
 * @param arr - The array of strings to be validated and updated.
 * @param el - The string element to be checked for duplication.
 * @returns The updated array after adding or removing the element.
 */
export const duplicateValidation = (arr: string[], el: string) => {
  if (!arr.find((t) => t === el)) {
    arr.push(el)
    return arr
  } else {
    arr = arr.filter((t) => t !== el)
    return arr
  }
}