import React from 'react';

class Slide extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div key={data.img}>
        <div style={{
          borderRadius: 7,
          height: 450,
          width: '100%',
          background: ` 
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.8)
            ),url(${data.img})`,
          backgroundSize: 'cover',
          zIndex: 1,
          position: 'relative',
        }}
        />
        <h2 style={{
          textAlign: 'right',
          position: 'relative',
          marginTop: -70,
          zIndex: 3,
          color: 'white',
          padding: 20,
          bottom: 150,
        }}
        >
          {data.title}
        </h2>
        <p style={{
          position: 'relative',
          zIndex: 33,
          padding: 20,
          color: 'white',
          fontSize: 17,
          textAlign: 'right',
          marginTop: -185,
        }}
        >
          {data.desc}
        </p>
      </div>

    );
  }
}

export default Slide;
