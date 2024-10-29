type Props = {
  size?: number;
};

const Quilt: React.FC<Props> = ({ size = 16 }) => {
  return (
    <div style={{ width: size, height: size }}>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        clip-rule="evenodd"
        viewBox="0 0 24 24"
      >
        <defs>
          <path
            id="quilt"
            fill="none"
            stroke="currentColor"
            stroke-width="65.6"
            d="M442.5 233.9c0-6.4-5.2-11.6-11.6-11.6h-197c-6.4 0-11.6 5.2-11.6 11.6v197c0 6.4 5.2 11.6 11.6 11.6h197c6.4 0 11.6-5.2 11.6-11.7v-197Z"
          />
        </defs>
        <path fill="none" d="M0 0h24v24H0z" />
        <use
          stroke-width="65.6"
          transform="matrix(.03053 0 0 .03046 -3.2 -3.2)"
        />
        <use stroke-width="65.6" transform="matrix(.03053 0 0 .03046 -3.2 7)" />
        <use
          stroke-width="65.6"
          transform="matrix(.03053 0 0 .03046 6.9 -3.2)"
        />
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="70.4"
          d="M442.5 234.8c0-7-5.6-12.5-12.5-12.5H234.7c-6.8 0-12.4 5.6-12.4 12.5V430c0 6.9 5.6 12.5 12.4 12.5H430c6.9 0 12.5-5.6 12.5-12.5V234.8Z"
          transform="rotate(45 3.5 24) scale(.02843 .02835)"
        />
      </svg>
    </div>
  );
};

export default Quilt;
