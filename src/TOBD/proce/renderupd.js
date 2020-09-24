render() {
  const history = this.state.history;
  const current = history[history.length - 1];
  const hwtk = calculatehwtk(current.squares);
  let status;
  if (hwtk) {
    status = 'hwtk: ' + hwtk;
  } else {
    status = 'Next pmp: ' + (this.state.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="hwtk">
      <div className="hwtk-jilsit">
        <jilsit
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
      </div>
      <div className="hwtk-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}