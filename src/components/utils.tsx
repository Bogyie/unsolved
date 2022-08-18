export const inputNumberParser = (value: string) => {
    const num = Number(value);

    if (Number.isInteger(num) && 0 <= num) {
        return num;
    }

    alert('숫자만 입력 가능합니다.');
    return 0;
}