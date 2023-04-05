function classNames(...names: any[]): string {
  return names.filter(Boolean).join(' ')
}

export default classNames
