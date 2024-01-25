import { MeshPhongMaterial, MeshStandardMaterial } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useSpring, animated, config } from "@react-spring/three";
import { useMemo } from "react";

const ZoomImageMaterial = ({ hovered, texture }) => {
  var HoverImageShader = {
    vertexShader: ` varying vec2 vUv;
    void main() {
      vUv = uv;
    }`,
    fragmentShader: `
      precision highp float; 
  
      uniform sampler2D tex;
      uniform float imageAspectRatio;
      uniform float aspectRatio;
      uniform float op;
      uniform float hover;
      varying vec2 vUv;
  
      float exponentialInOut(float t) {
        return t == 0.0 || t == 1.0 
          ? t 
          : t < 0.5
            ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
            : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
      } 
  
      void main() {
        vec2 uv = vUv;
  
        // fix aspectRatio
        float u = imageAspectRatio/aspectRatio;
        if(imageAspectRatio > aspectRatio) {
          u = 1. / u;
        }
  
        uv.y *= u;
        uv.y -= (u)/2.-.5;
  
        // hover effect
        float zoomLevel = .2;
        float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * hover) + hover));
        uv *= 1. - zoomLevel * hoverLevel;
        uv += zoomLevel / 2. * hoverLevel;
        uv = clamp(uv, 0., 1.);
        vec4 color = texture2D(tex, uv);
        if(hoverLevel > 0.) {
          hoverLevel = 1.-abs(hoverLevel-.5)*2.;
          //Pixel displace
          uv.y += color.r * hoverLevel * .05;
          color = texture2D(tex, uv);
          // RGBshift
          color.r = texture2D(tex, uv+(hoverLevel)*0.1).r;
          color.g = texture2D(tex, uv-(hoverLevel)*0.1).g;
        }
  
        csm_DiffuseColor = mix(vec4(1.,1.,1.,op), color, op);
      }
    `,
    uniforms: {
      tex: {
        type: "t",
        value: "",
      },
      imageAspectRatio: {
        type: "f",
        value: 1.0,
      },
      aspectRatio: {
        type: "f",
        value: 1.0,
      },
      op: {
        type: "f",
        value: 1.0,
      },
      hover: {
        type: "f",
        value: 0.0,
      },
    },
  };

  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  });

  //const baseMat = useMemo(() => new MeshStandardMaterial({ roughness: 0.08, metalness: 0.5 }), []);
  // const baseMat = useMemo(() => new MeshBasicMaterial(), []);
  const baseMat = useMemo(() => new MeshPhongMaterial(), []);

  const AnimatedThreeCustomShaderMaterial = useMemo(() => animated(ThreeCustomShaderMaterial), []);
  //const AnimatedThreeCustomShaderMaterial = animated(ThreeCustomShaderMaterial);

  return (
    <AnimatedThreeCustomShaderMaterial
      baseMaterial={baseMat}
      vertexShader={HoverImageShader.vertexShader}
      fragmentShader={HoverImageShader.fragmentShader}
      silent
      uniforms={HoverImageShader.uniforms}
      uniforms-hover-value={hoverValue}
      uniforms-tex-value={texture}
    ></AnimatedThreeCustomShaderMaterial>
  );
};

export default ZoomImageMaterial;
