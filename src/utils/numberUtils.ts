const digits = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
const units = ['', '拾', '佰', '仟', '萬', '拾', '佰', '仟', '億'];

interface ChineseAmountDisplay {
  digit: string | null;
  unit: string;
  show: boolean;
}

export const formatChineseAmount = (amount: number): ChineseAmountDisplay[] => {
  // 如果金額為 0，表示尚未輸入數字，顯示所有單位作為 placeholder
  if (amount === 0) {
    return Array.from({ length: 9 }).map((_, i) => ({
      digit: null,
      unit: units[8 - i],
      show: true
    }));
  }

  const numStr = Math.floor(amount).toString().padStart(9, '0');
  
  // 找到第一個非零數字的位置（從左到右）
  const firstNonZeroIndex = numStr.split('').findIndex(char => char !== '0');
  
  // 從最高位開始處理
  const result: ChineseAmountDisplay[] = [];
  
  for (let i = 0; i < numStr.length; i++) {
    const num = parseInt(numStr[i]);
    const unit = units[numStr.length - 1 - i];
    
    // 決定是否顯示刪除線
    // - 如果位置在第一個非零數字之前，顯示刪除線
    // - 如果位置在第一個非零數字之後，不顯示刪除線
    const shouldStrike = i < firstNonZeroIndex;
    
    // 決定要顯示的數字
    let displayDigit: string | null;
    if (shouldStrike) {
      // 超過實際金額的部分，不顯示數字
      displayDigit = null;
    } else if (num === 0) {
      // 實際金額內的零
      displayDigit = '零';
    } else {
      // 非零數字
      displayDigit = digits[num];
    }

    result.push({
      digit: displayDigit,
      unit,
      show: !shouldStrike // 只有不需要刪除線的才顯示
    });
  }

  return result;
};