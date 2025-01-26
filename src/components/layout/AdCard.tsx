import { ExternalLink } from 'lucide-react';

export function AdCard() {
  const links = [
    {
      title: '電子發票整合平台',
      description: '查詢、下載與管理電子發票',
      url: 'https://www.einvoice.nat.gov.tw'
    },
    {
      title: '財政部稅務入口網',
      description: '稅務資訊查詢與線上申辦服務',
      url: 'https://www.etax.nat.gov.tw'
    },
    {
      title: '營業稅專區',
      description: '營業稅相關資訊與常見問題解答',
      url: 'https://www.ntbca.gov.tw'
    }
  ];

  return (
    <div className="p-3">
      <h2 className="text-sm font-medium text-gray-500 mb-1.5">相關連結</h2>
      <div>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex items-start justify-between py-1">
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-xs text-gray-500">
                  {link.description}
                </p>
              </div>
            </div>
            {index !== links.length - 1 && (
              <div className="h-px bg-gray-50 mt-1" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}