export default function BgLayers() {
  return (
    <>
      <div className="bg-layers" aria-hidden>
        <div className="parallax" data-parallax="-0.06">
          <div className="bg-mesh" />
        </div>
        <div className="parallax" data-parallax="-0.025">
          <div className="bg-grid" />
        </div>
        <div className="parallax" data-parallax="-0.045">
          <div className="bg-dots" />
        </div>
        <div className="bg-vignette" />
      </div>
      <div className="scanlines" id="scanlines" aria-hidden />
      <div className="noise" aria-hidden />
    </>
  )
}
