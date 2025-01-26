interface CompanyApiResponse {
  data: {
    公司名稱: string;
    公司所在地: string;
    財政部?: {
      營業人名稱: string;
      營業地址: string;
    };
  };
}

export const fetchCompanyInfo = async (uniformNumber: string): Promise<string | null> => {
  if (!uniformNumber || uniformNumber.length !== 8) return null;
  
  try {
    const response = await fetch(`https://company.g0v.ronny.tw/api/show/${uniformNumber}`);
    
    if (!response.ok) return null;
    
    const data = await response.json() as CompanyApiResponse;
    
    // 優先使用財政部的營業人名稱，如果沒有則使用公司名稱
    return data.data?.財政部?.營業人名稱 || data.data?.公司名稱 || null;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};