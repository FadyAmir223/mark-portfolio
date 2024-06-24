type ProjectTypeProps = {
  params: {
    type: 'commercial' | 'residential'
  }
}

export default function ProjectType({ params }: ProjectTypeProps) {
  return <div>{params.type}</div>
}
