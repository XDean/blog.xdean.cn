export const OverlayScrollBarDemo = () => {
  const css = `#demo {
    width: 500px;
    height: 300px;
    border: gray solid 1px;
    overflow: auto;
}

@supports (overflow: overlay) {
    #demo {
        overflow: overlay;
    }
}

#demo::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
}

#demo::-webkit-scrollbar-thumb {
    background-color: #94a3b850;
    border-radius: 4px;
}

#demo:hover::-webkit-scrollbar-thumb {
    background-color: #94a3b8;
}

#demo::-webkit-scrollbar-track {
    background-color: #0000;
}

#demo::-webkit-scrollbar-track:hover {
    background-color: #e2e8f0;
}

#demo > div {
    height: 800px;
    background: linear-gradient(blue, red);
}`;
  return (
    <div>
      <div id={'demo'}>
        <style>
          {css}
        </style>
        <div/>
      </div>
      <div className={'mt-4'}>
      <pre>
        <code>
          {css}
        </code>
      </pre>
      </div>
    </div>
  );
};