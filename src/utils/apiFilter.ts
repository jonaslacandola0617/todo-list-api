import { ParsedQs } from 'qs';

class APIFilters {
  query: Record<string, any>;
  request: ParsedQs;

  constructor(query: Record<string, any>, request: ParsedQs) {
    this.query = query;
    this.request = request;
  }

  filter() {
    const queryObj = { ...this.request };
    const excluded = ['sort', 'limit', 'page', 'fields'];

    excluded.forEach((filter) => delete queryObj[filter]);

    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.request.fields && typeof this.request.fields === 'string') {
      const fields = this.request.fields.split(',').join(' ');

      this.query = this.query.sort(fields);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  fields() {
    if (this.request.fields && typeof this.request.fields === 'string') {
      const fields = this.request.fields.split(',').join(' ');

      this.query = this.query.select(fields) as typeof this.query;
    } else {
      this.query = this.query.select('-__v') as typeof this.query;
    }

    return this;
  }

  paginate() {
    const page = Number(this.request.page) || 1;
    const limit = Number(this.request.limit) || 20;

    this.query = this.query.skip((page - 1) * limit).limit(limit);

    return this;
  }
}

export default APIFilters;
