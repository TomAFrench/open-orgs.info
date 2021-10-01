import React from 'react';

interface RowProps {
  protocol: any;
  index: number;
}

const font = 'SofiaProRegular, Sofia Pro, sofia-pro';

const Row: React.FC<RowProps> = ({ protocol, index }) => {
  let svgImg;

  const icon = protocol.metadata.icon;

  if (icon?.indexOf('data:image/svg+xml;base64,') === 0) {
    const buffer = new Buffer(icon.substr(26), 'base64');
    svgImg = buffer.toString('ascii');
    svgImg = svgImg.replace('<?xml version="1.0" encoding="utf-8"?>', '')
    svgImg = svgImg.replace(/<svg([^>]*)(?: (?:width|height)="\d+"){2}/, '<svg $1')
    svgImg = svgImg.replace(/">/, '" width="24" height="24">')
  }

  return (
    <g transform={`translate(28, ${117 + 37 * index})`}>
      <rect fill="#ffffff" x="0" y="0" width="628" height="37"></rect>

      <g transform="translate(10, 4)">
        <text fontFamily={font} fontSize="16" fill="#091636" x="0" y="18">
          {index + 1}.
        </text>

        <g transform="translate(36,0)">
          {svgImg ? (
            <g dangerouslySetInnerHTML={{ __html: svgImg }} />
          ) : (
            <image x="0" y="0" width="24" height="24" href={icon} />
          )}
        </g>

        <text fontFamily={font} fontSize="16" fill="#091636" x="70" y="18">
          {protocol.metadata.name}
        </text>

        <text y="18" x="600" fontFamily={font} fontSize="16" textAnchor="end" fill="#091636">
          {protocol.results.currentTreasuryUSD?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </text>
      </g>
    </g>
  );
};

export default Row;
