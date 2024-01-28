def sort(nums):
    """
    Function to perform a bubble sort on a list.

    Parameters:
    - nums (list): The list to be sorted.

    Returns:
    - list: The sorted list.
    """
    print("Before sorting:", nums)
    for i in range(len(nums)-1, 0, -1):
        for j in range(i):
            if nums[j] > nums[j+1]:
                temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
    print("After sorting:", nums)
    return nums

# Example usage
lst = [25, 76, 1, 13, 87]
result = sort(lst)
print(result)
