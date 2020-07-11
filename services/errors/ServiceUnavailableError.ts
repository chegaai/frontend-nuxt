export default class ServiceUnavailableError extends Error {
  constructor(service: string, public readonly originalMessage: string) {
    super(`Service ${service} is not available`)
    this.originalMessage = originalMessage
  }
}
